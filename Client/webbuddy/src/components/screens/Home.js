import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  console.log(data);

  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <Container>
      {data.length === 0 ? (
        <div
          style={{
            height: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>No posts !!!</h1>
        </div>
      ) : (
        data.map((item, index) => {
          return (
            <Row className="justify-content-md-center" key={index}>
              <div className="col-12 col-md-8 card-post">
                <Paper elevation={3}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar>
                          <img
                            src={item?.postedBy?.pic}
                            alt="..."
                            style={{ objectFit: "cover" }}
                            height={100}
                            width={100}
                          />
                        </Avatar>
                      }
                      action={
                        item.postedBy._id === state._id && (
                          <IconButton
                            style={{ color: "gray" }}
                            variant="primary"
                            onClick={() => {
                              deletePost(item._id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )
                      }
                      title={
                        <Link
                          to={
                            item.postedBy._id !== state._id
                              ? "/profile/" + item.postedBy._id
                              : "/profile"
                          }
                        >
                          {item.postedBy.name}
                        </Link>
                      }
                      subheader={item.postedBy.email}
                    />
                    <Card.Body>
                      <img
                        src={item.photo}
                        alt="..."
                        style={{
                          border: "solid #444 1px",
                          borderRadius: "10px",
                        }}
                      />
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <div>
                          {item.likes.includes(state._id) ? (
                            <IconButton
                              onClick={() => {
                                unlikePost(item._id);
                              }}
                              style={{ color: "red" }}
                            >
                              <FavoriteIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => {
                                likePost(item._id);
                              }}
                              style={{ color: "gray" }}
                            >
                              <FavoriteBorderIcon />
                            </IconButton>
                          )}
                        </div>
                        <div>{item.likes.length} Likes</div>
                      </div>
                      <div className="mt-3">
                        <h4>{item.title}</h4>
                      </div>
                      <div>
                        <p>{item.body}</p>
                      </div>
                      <Accordion
                        style={{
                          backgroundColor: "transparent",
                          color: "gray",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          Comments
                        </AccordionSummary>
                        <AccordionDetails>
                          <List>
                            {item.comments.map((record) => {
                              return (
                                <>
                                  <Divider style={{ background: "gray" }} />
                                  <ListItem>
                                    <ListItemText
                                      primary={record.postedBy.name}
                                      secondary={record.text}
                                      style={{ color: "gray !important" }}
                                    />
                                  </ListItem>
                                </>
                              );
                            })}
                            <Divider style={{ background: "gray" }} />
                            <ListItem>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  makeComment(e.target[0].value, item._id);
                                }}
                              >
                                <TextField
                                  id="input-with-icon-textfield"
                                  label="Add a comment"
                                  style={{ backgroundColor: "#" }}
                                />
                              </form>
                            </ListItem>
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Card.Footer>
                  </Card>
                </Paper>
              </div>
            </Row>
          );
        })
      )}
    </Container>
  );
};

export default Home;
