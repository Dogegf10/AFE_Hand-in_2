"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, getUserWorkouts } from "./components/UserApiCalls";
import { WorkoutCardComponent } from "./components/WorkoutCardComponent";
import { ChangePasswordComponent } from "./components/ChangePasswordComponent";
import { ChangeUserInfoComponent } from "./components/ChangeUserInfoComponent";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedMenuOption, setSelectedMenuOption] = useState("workouts");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("Token found in localStorage:", storedToken);
      setToken(storedToken);
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      console.log("Decoded payload:", payload);
      setUserId(payload.UserId); // Ensure the correct key is used
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (token && userId) {
      console.log(
        `Fetching user data with token ${token} and userId: ${userId}`
      );
      getUserData(token, userId)
        .then((data) => {
          if (data) {
            console.log("User data fetched:", data);
            setUserData(data);
          } else {
            console.log("No user data returned");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      getUserWorkouts(token, userId)
        .then((data) => {
          if (data) {
            console.log("User workouts fetched:", data);
            setUserWorkouts(data);
            if (data.length === 1) {
              setSelectedWorkout(data[0]);
            }
          } else {
            console.log("No user workouts returned");
          }
        })
        .catch((error) => {
          console.error("Error fetching user workouts:", error);
        });
    }
  }, [token, userId]);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
  };

  const renderContent = () => {
    switch (selectedMenuOption) {
      case "workouts":
        return (
          <div>
            {userWorkouts.length > 1 ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Select a Workout Program
                </h3>
                <ul className="space-y-2">
                  {userWorkouts.map((workout, index) => (
                    <li
                      key={index}
                      onClick={() => handleWorkoutSelect(workout)}
                      className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                    >
                      {workout.name}
                    </li>
                  ))}
                </ul>
                {selectedWorkout && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Selected Workout Program
                    </h3>
                    <WorkoutCardComponent prop={selectedWorkout} />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Your Workout Program
                </h3>
                {selectedWorkout && (
                  <WorkoutCardComponent prop={selectedWorkout} />
                )}
              </div>
            )}
          </div>
        );
      case "updateInfo":
        return <ChangeUserInfoComponent token={token} uData={userData} />;
      case "changePassword":
        return <ChangePasswordComponent token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          <li
            onClick={() => setSelectedMenuOption("workouts")}
            className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
              selectedMenuOption === "workouts" ? "bg-gray-700" : ""
            }`}
          >
            Workouts
          </li>
          <li
            onClick={() => setSelectedMenuOption("updateInfo")}
            className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
              selectedMenuOption === "updateInfo" ? "bg-gray-700" : ""
            }`}
          >
            Update User Info
          </li>
          <li
            onClick={() => setSelectedMenuOption("changePassword")}
            className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
              selectedMenuOption === "changePassword" ? "bg-gray-700" : ""
            }`}
          >
            Change Password
          </li>
        </ul>
      </div>
      <div className="flex-grow p-4 overflow-auto">
        {userData ? (
          <div className="user-page-content">{renderContent()}</div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}
