export const getUserData = async (token, userId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data from getUserData:", data);
        return data;
    } catch (error) {
        console.error("Error in getUserData:", error);
        return null;
    }
};

export const putUserData = async (token, userId, data) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error in postUserData:", error);
    }
};

export const postUserPassword = async (token, data) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/Password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error in postUserPassword:", error);
    }
};

export const getUserWorkouts = async (token, userId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/WorkoutPrograms/client/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data from getUserWorkouts:", data);
        return data;
    } catch (error) {
        console.error("Error in getUserWorkouts:", error);
        return null;
    }
};

export const getWorkoutProgram = async (token, workoutProgramId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/WorkoutPrograms/${workoutProgramId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data from getWorkoutProgram:", data);
        return data;
    } catch (error) {
        console.error("Error in getWorkoutProgram:", error);
        return null;
    }
};