export const WorkoutCardComponent = ({ prop }) => {
  const { name, description, exercises } = prop;

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2 text-black">{name}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="list-decimal list-inside">
        {exercises.map((exercise, index) => (
          <li key={index} className="text-gray-600">
            {exercise.name}
            <ul className="list-disc list-inside ml-4 text-sm">
              {exercise.description && (
                <li className="list-none">{exercise.description}</li>
              )}
              {exercise.sets && <li>Sets: {exercise.sets}</li>}
              {exercise.repetitions > 0 && (
                <li>Reps: {exercise.repetitions}</li>
              )}
              {exercise.time && <li>Time: {exercise.time}</li>}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
