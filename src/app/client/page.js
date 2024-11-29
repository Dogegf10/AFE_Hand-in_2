'use client';
import './user.css';
import React, { useState, useEffect } from 'react';
import { getUserData, getUserWorkouts } from './components/UserApiCalls';
import { WorkoutCardComponent } from './components/WorkoutCardComponent';
import { ChangePasswordComponent } from './components/ChangePasswordComponent';
import { ChangeUserInfoComponent } from './components/ChangeUserInfoComponent';
import { redirect } from 'next/navigation';

const User = () => {
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
            console.log(`Fetching user data with token ${token} and userId: ${userId}`);
            getUserData(token, userId).then((data) => {
                if (data) {
                    console.log("User data fetched:", data);
                    setUserData(data);
                } else {
                    console.log("No user data returned");
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });

            getUserWorkouts(token, userId).then((data) => {
                if (data) {
                    console.log("User workouts fetched:", data);
                    setUserWorkouts(data);
                    if (data.length === 1) {
                        setSelectedWorkout(data[0]);
                    }
                } else {
                    console.log("No user workouts returned");
                }
            }).catch((error) => {
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
                                <h3>Select a Workout Program</h3>
                                <ul>
                                    {userWorkouts.map((workout, index) => (
                                        <li key={index} onClick={() => handleWorkoutSelect(workout)}>
                                            {workout.name}
                                        </li>
                                    ))}
                                </ul>
                            {selectedWorkout && (
                                <div>
                                    <h3>Selected Workout Program</h3>
                                    <WorkoutCardComponent prop={selectedWorkout} />
                                </div>
                            )}
                            </div>
                        ) : (
                            <div>
                                <h3>Your Workout Program</h3>
                                {selectedWorkout && <WorkoutCardComponent prop={selectedWorkout} />}
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
        <div className='user-page'>
            <div className='sidebar'>
                <ul>
                    <li onClick={() => setSelectedMenuOption("workouts")}>Workouts</li>
                    <li onClick={() => setSelectedMenuOption("updateInfo")}>Update User Info</li>
                    <li onClick={() => setSelectedMenuOption("changePassword")}>Change Password</li>
                </ul>
            </div>
            <div className='body'>
                {userData ? (
                    <div className='user-page-content'>
                        <h2>Welcome {userData.firstName}</h2>
                        {renderContent()}
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div>
    );
}

export default User;