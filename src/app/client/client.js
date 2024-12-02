import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, getUserWorkouts } from "../UserApiCalls";
import { ChangeUserInfoComponent } from "./components/ChangeUserInfoComponent";
import { WorkoutCardComponent } from "./components/WorkoutCardComponent";
import { ChangePasswordComponent } from "./components/ChangePasswordComponent";

export default function ClientComponent({ token, userData }) {
  const router = useRouter();
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedMenuOption, setSelectedMenuOption] = useState("workouts");
  const [trainer, setTrainer] = useState("");

  useEffect(() => {
    if (token && userData) {
      getUserWorkouts(token, userData.userId)
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
  }, [token, userData]);

  useEffect(() => {
    if (!selectedWorkout) {
      return;
    }
    getUserData(token, selectedWorkout.personalTrainerId)
      .then((data) => {
        if (data) {
          console.log("Trainer data fetched:", data);
          setTrainer(data);
        } else {
          console.log("No trainer data returned");
        }
      })
      .catch((error) => {
        console.error("Error fetching trainer data:", error);
      });
  }, [selectedWorkout, token]);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
  };

  const renderContent = () => {
    switch (selectedMenuOption) {
      case "workouts":
        return (
          <div className="flex">
            <div className="flex-1">
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
            <div className="ml-4">
              <img
                src="/img/client_pig.png"
                alt="Logo"
                className="h-32 w-auto"
              />
            </div>
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
