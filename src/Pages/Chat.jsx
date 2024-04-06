import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	sendMessage,
	getPrivateConversation,
	getPrivateConversation2,
} from "../redux/action/studentAction";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

//Swap HelperFunction
function swap(input, value_1, value_2) {
	var temp = input[value_1];
	input[value_1] = input[value_2];
	input[value_2] = temp;
}

let socket;

const Chat = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [room1, setRoom1] = useState("");
	const [room2, setRoom2] = useState("");
	const [receiverRegistrationNumber, setReceiverRegistrationNumber] =
		useState("");
	const [message, setMessage] = useState("");
	const [messageArray, setMessageArray] = useState([]);
	const [olderMessages, setOlderMessages] = useState([]);
	const ENDPOINT = "";
	// console.log(room2);
	const { room } = useParams();
	useEffect(() => {
		socket = io(ENDPOINT);
		let tempArr = room.split(".");
		// setReceiverRegistrationNumber(tempArr[0]);
		// console.log(receiverRegistrationNumber);
		// swap(tempArr, 0, 1);
		let tempRoom0 = tempArr[0];
		let tempRoom1 = tempArr[1];
		setRoom1(tempRoom0);
		setRoom2(tempRoom1);
	}, [ENDPOINT, room]);

	useEffect(() => {
		dispatch(getPrivateConversation(room1));
		dispatch(getPrivateConversation2(room2));
		socket = io(ENDPOINT);
		socket.emit("join room", {
			room1,
			room2,
		});
		socket.on("new Message", (data) => {
			setMessageArray([...messageArray, data]);
		});
		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [room1, room2]);

	const formHandler = (e) => {
		e.preventDefault();
		if (message.trim().length > 0) {
			socket.emit("private message", {
				sender: store.student.student.student.name,
				message,
				room: room1,
			});
			setMessage("");
			let messageObj = {
				roomId: room1,
				senderName: store.student.student.student.name,
				senderId: store.student.student.student._id,
				message,
				senderRegistrationNumber:
					store.student.student.student.registrationNumber,
				receiverRegistrationNumber,
			};
			dispatch(sendMessage(room1, messageObj));
		} else {
			alert("Can't send empty message");
		}
	};

	useEffect(() => {
		socket.on("new Message", (data) => {
			setOlderMessages(store.student.privateChat);
			setMessageArray([...messageArray, data]);
		});
	}, [messageArray, olderMessages]);

	return (
		<div>
			{store.student.isAuthenticated ? (
				<>
					<div className="container">
						<div className="row">
							<div className="col-md-5">
								<form className="form-inline" onSubmit={formHandler}>
									<div className="form-group ">
										{/* <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here.." type="text" className="form-control" /> */}
										<textarea
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											placeholder="Type here.."
											type="text"
											className="form-control"
										/>
									</div>
									<button type="submit" className="btn btn-primary ml-1 ">
										Send
									</button>
								</form>
							</div>
							<div className="col-md-7">
								{store.student.privateChat.map((obj, index) => (
									<div key={index}>
										<p>
											{obj.senderName}: {obj.message}, {obj.createdAt}
										</p>
									</div>
								))}
								{messageArray.map((obj, index) => (
									<p key={index}>
										{obj.sender}: {obj.message}
									</p>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default Chat;
