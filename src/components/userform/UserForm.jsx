import "./userform.scss";
import { useState } from "react";
import { UploadSolid } from "../../assets/PixelIcons";

const UserForm = () => {

    const [file, setFile] = useState("");

    const handleUserInfo = (e) => {
        e.preventDefault();
    }

    return ( 
        <div className="formContainer">
        <div className="avatar">
            <img src={
                file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            } alt="" />
            <div className="postfile" >
                <label htmlFor="file" className="fileInput"><UploadSolid width='25' height='25' /></label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
            </div>
        </div>
        <form onSubmit={handleUserInfo}>
            <div className="formItem">
                <label>Name</label >
                <input type="text" required></input>
            </div>
            <div className="formItem">
                <label>Email</label>
                <input type="email" required></input>
            </div>
            <div className="formItem">
                <label>Description</label>
                <input type="text"></input>
            </div>
            <div className="formItem">
                <label>Password</label>
                <input type="password" required></input>
            </div>
            <div className="formItem">
                <label>Confim Password</label>
                <input type="password" required></input>
            </div>

            <button type="submit" className="submitButton">Submit</button>

        </form>
    </div>
     );
}
 
export default UserForm;