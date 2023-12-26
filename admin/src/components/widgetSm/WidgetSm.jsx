import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../hooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/allUsersRedux";

export default function WidgetSm() {
  const users = useSelector(state => state.allUsers.users);
  const TOKEN = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(TOKEN));
  }, [TOKEN]);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
