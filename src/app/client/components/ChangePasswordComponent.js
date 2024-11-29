export const ChangePasswordComponent = (token) => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (event.target.newPassword.value !== event.target.confirmNewPassword.value) {
            alert("New password and confirm new password do not match.");
            return;
        }

        const formData = new FormData(event.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("currentPassword"),
            oldPassword: formData.get("newPassword"),
        };
        putUserPassword(token, data);
    };
    return (
        <div className='change-password'>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email'  />
                <label htmlFor='currentPassword'>Current Password</label>
                <input type='password' id='currentPassword' name='currentPassword' />
                <label htmlFor='newPassword'>New Password</label>
                <input type='password' id='newPassword' name='newPassword' />
                <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                <input type='password' id='confirmNewPassword' name='confirmNewPassword' />
                <button type='submit'>Change Password</button>
            </form>
        </div>
    );
};