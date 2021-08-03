import React, { useContext, useEffect, useState } from "react";
import { firebaseDB, timeStamp } from "../config/firebase";
import { AuthContext } from "../context/AuthProvider";
import {
  Card,
  Button,
  makeStyles,
  Typography,
  TextField,
  Avatar,
  Container,
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import Box from '@material-ui/core/Box';

const VideoPost = (props) => {
  let [user, setUser] = useState(null);
  let [comment, setComment] = useState("");
  let [commentList, setCommentList] = useState([]);
  let [likesCount, setLikesCount] = useState(null); // no,of likes for that post count maintain hoga
  let [isLiked, setIsLiked] = useState(false); // current user n like kra h ya nhi wo 

  let { currentUser } = useContext(AuthContext); // jo abhi login h wo lao kyuki uski profile pic chahie collection se
  // { comment , profilePhotoUrl }

  const useStyles = makeStyles({
    videoContainerSize: {
      // height: "100%",
    },
  });

  let classes = useStyles();

  const addCommentToCommentList = async (e) => {
    let profilePic;
    // when commenting user and post author user is same
    if (currentUser.uid == user.userId) {
      profilePic = user.profileImageUrl;
    } 
    else {
      let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
      let user = doc.data();
      profilePic = user.profileImageUrl;
    }
    let newCommentList = [
      ...commentList,
      {
        profilePic: profilePic,
        comment: comment,
      },
    ];

    // add comments in firebase
    let postObject = props.postObj;
    postObject.comments.push({ uid: currentUser.uid, comment: comment });
    // it will set a new post object with updated comments in firebase DB
    await firebaseDB.collection("posts").doc(postObject.pid).set(postObject);
    setCommentList(newCommentList);
    setComment("");
  };

  const toggleLikeIcon = async () =>{
    if(isLiked){
      // post liked hai to unlike the post
      // make isLiked = false;
      // in postDoc remove your uid in likes array !
      // setLikesCount(1 ? null : -1);
      let postDoc = props.postObj;
      let filteredLikes = postDoc.likes.filter( uid =>{
        if(uid === currentUser.uid){
          return false;
        }
        else{
          return true;
        }
      });
      postDoc.likes = filteredLikes;
      await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
      setIsLiked(false);
      likesCount === 1 ? setLikesCount(null) : setLikesCount(likesCount-1);
    }
    else{
      // post liked nhi hai to like the post
      // make isLiked = true;
      // in postDOc add your uid in likes array !
      // setLikesCount( null ? 1 : +1);
      let postDoc = props.postObj;
      postDoc.likes.push(currentUser.uid);
      await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
      setIsLiked(true);
      likesCount == null ? setLikesCount(1) : setLikesCount(likesCount+1);
    }
  }

  useEffect(async () => {
    // console.log(props);
    // Jiski reel h uski uid lao then data fetch kro collection se and profile image, username show kro reel k sath upar
    let uid = props.postObj.uid;
    let doc = await firebaseDB.collection("users").doc(uid).get();
    let user = doc.data();
    let commentList = props.postObj.comments;
    let likes = props.postObj.likes;
    // {uid , comment} , {uid , comment} , {uid , comment};
    let updatedCommentList = [];

    // Har comment p iterate krke uski pic and comment nikaal rhe h and update krrhe h comment list
    for (let i = 0; i < commentList.length; i++) {
      let commentObj = commentList[i];
      let doc = await firebaseDB.collection("users").doc(commentObj.uid).get();
      let commentUserPic = doc.data().profileImageUrl;
      updatedCommentList.push({
        profilePic: commentUserPic,
        comment: commentObj.comment,
      });
    }

    if (likes.includes(currentUser.uid)) {
      setIsLiked(true);
      setLikesCount(likes.length);
    } else {
      if(likes.length){
        setLikesCount(likes.length);
      }
    }

    // console.log(updatedCommentList);
    setUser(user);
    setCommentList(updatedCommentList);
  }, []); //comp did Mount

  return (
    <Container>
      <Card
        style={{
          // height: "80vh",
          width: "350px",
          margin: "auto",
          padding: "10px",
          marginBottom: "20px",
          backgroundColor:"#effbef",
        }}
      >
        <div style={{display:"flex" }}>
          <Avatar style={{ marginBottom:"0.7rem" }} src={ user ? user.profileImageUrl : ""} />
          <Typography style={{ marginLeft:"0.2rem" }}>
            <Box fontWeight="fontWeightBold" m={1}>
              {user ? user.username : ""}
            </Box>
          </Typography>
        </div>

        <div className="video-container">
          <Video
            className={classes.videoContainerSize} // User k data hoga to wo ajaega nhi toh null krke khali video render hogi first render me
            src={props.postObj.videoLink} 
          ></Video>
        </div>
        <div>
        {isLiked ? (
            <Favorite
              onClick={() => toggleLikeIcon()}
              style={{ color: "red" }}
            ></Favorite>
          ) : (
            <FavoriteBorder onClick={() => toggleLikeIcon()}></FavoriteBorder>
          )}
        </div>

        {likesCount && (
          <div>
            <Typography variant="subtitle1">Liked by {likesCount} others </Typography>
          </div>
        )}
        <Typography variant="subtitle1">Comments</Typography>
        <TextField
          variant="outlined"
          label="Add a comment"
          size="small"
          style = {{ width:"35vh"}}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          color="secondary"
          onClick={addCommentToCommentList}
          style={{marginLeft:"25px"}}
        >
          Post
        </Button>

        {commentList.map((commentObj) => {
          return (
            <div style={{display:"flex" }}>
              <Avatar src={commentObj.profilePic} style={{marginTop:"1rem"}}></Avatar>
              <Typography variant="subtitle1" style={{ marginLeft:"0.5rem" , marginTop:"1.2rem"}}>{commentObj.comment}</Typography>
            </div>
          );
        })}
      </Card>
    </Container>
  );
};


//Video khatam hote hi next sibling find krke auto scroll hoga and play hone lgegi video
function Video(props) {
  const handleAutoScroll = (e) => {
      // // console.log(e);
      // let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode
      //   .nextSibling;
      // // console.log(next);
      // if (next) {
      //   next.scrollIntoView({ behaviour: "smooth" });
      //   e.target.muted = "true";
      // }
  };

  return(
      <video
        style={{
          height: "100%",
          width: "100%",
          scrollSnapAlign: "start",
        }}
        muted={true}
        loop={true}
        controls
        onEnded={handleAutoScroll}
        onClick={(e) => {
          console.log(timeStamp());
        }}
      >
        <source src={props.src} type="video/mp4"></source>
      </video>
  );
}

export default VideoPost;