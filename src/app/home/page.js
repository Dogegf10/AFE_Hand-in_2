"use client";
import { useEffect, useState } from "react";
import { getUserData } from "../UserApiCalls";
import ClientComponent from "../client/client";
import TrainerComponent from "../trainer/trainer";
import ManagerComponent from "../manager/manager";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [renderComponent, setRenderComponent] = useState("home");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      getUserData(token, payload.UserId)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      switch (user.accountType) {
        case "Client":
          setRenderComponent("client");
          break;
        case "PersonalTrainer":
          setRenderComponent("trainer");
          break;
        case "Manager":
          setRenderComponent("manager");
          break;
        default:
          setRenderComponent("home");
          break;
      }
    }
  }, [user]);

  const renderContent = () => {
    switch (renderComponent) {
      case "client":
        return <ClientComponent token={token} userData={user} />;
      case "trainer":
        return <TrainerComponent token={token} userData={user} />;
      case "manager":
        return <ManagerComponent token={token} userData={user} />;
      default:
        return (
          <div>
            <h1>Home Page</h1>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default HomePage;
