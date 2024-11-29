export const WorkoutCardComponent = ({ prop }) => {
    const { name, description, exercises } = prop;

    return (
        <div className='workout-page'>
            <h2>{name}</h2>
            <p>{description}</p>
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};