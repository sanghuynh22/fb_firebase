import "./App.css";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import {
	AiFillHome,
	AiOutlinePlus,
	AiFillVideoCamera,
	AiTwotoneVideoCamera,
	AiOutlineLike,
} from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import { db, storage, auth } from "./firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Login } from "./Login";

function App() {
	////////////////////////
	/*
			1. authen with email / password
			2. get data from firestore
			3. put data to firestore
			4. put and store image on storage
			5. switch between login and main page
			6. take data from authen put into UI
	*/
	////////////////////////////////
	const [user, setUser] = useState();
	const inputRef = useRef(null);
	const [status, setStatus] = useState([]);
	const [input, setInput] = useState("");
	const [urlImg, setUrlImg] = useState();
	const [showLogin, setShowLogin] = useState(true);

	async function getListData() {
		const querySnapshot = await getDocs(collection(db, "status"));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setStatus((pre) => [...pre, doc.data()]);
		});
	}

	async function submitHandle(e) {
		e.preventDefault();
		const docRef = await addDoc(
			collection(db, "status"),
			{
				name: "Bao Thy",
				like: 202,
				content: input,
				url: urlImg,
			},
			{ merge: true }
		);
		setInput("");
	}

	async function uploadFile(e) {
		const file = e.target.files[0];
		const fileRef = ref(storage, `images/${file.name}`);
		await uploadBytes(fileRef, file).then((snapshot) => {
			console.log("Uploaded a blob or file!");
		});

		getDownloadURL(ref(storage, `images/${file.name}`))
			.then((url) => {
				setUrlImg(url);
			})
			.catch((error) => {
				console.log("error", error);
			});

		console.log("done");
	}
	// console.log("inputRef", inputRef.current.value);
	// console.log("value", input);

	async function SignOut() {
		await signOut(auth)
			.then(() => {
				console.log("App.js signOut");
				setShowLogin(true);
			})
			.catch((error) => {
				console.error(error);
			});
		setUser(false);
	}

	useEffect(() => {
		const userProfile = auth.currentUser;

		setTimeout(setUser(userProfile), 5000);
		setTimeout(() => console.log("done"), 5000);
		console.log("userProfile", userProfile);
		getListData();
	}, []);
	return (
		<>
			{showLogin ? (
				<Login setShowLogin={setShowLogin} />
			) : (
				<div className="App">
					<div className="header">
						<div className="header_left">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png"
								className="header_left_logo"
							/>
							<div className="header_left_search">
								<BsSearch />
							</div>
						</div>
						<div className="header_content">
							<div className="header_option">
								<AiFillHome />
							</div>
							<div className="header_option">
								<AiFillHome />
							</div>
							<div className="header_option">
								<AiFillHome />
							</div>
							<div className="header_option">
								<AiFillHome />
							</div>
							<div className="header_option">
								<AiFillHome />
							</div>
							<div className="header_right">
								<div className="header_right_option">
									<AiOutlinePlus />
								</div>
								<div className="header_right_option">
									<AiOutlinePlus />
								</div>
								<div className="header_right_option">
									<AiOutlinePlus />
								</div>
								<div className="header_right_avatar">
									<img
										src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8JlYypGvtdmI-6PV4Q1ns4zyuz97WNb6-CkTH_hMHjvQ&oe=62EA1BF8"
										className="header_right_img"
									/>
									{/*/////////////////*/}
									<button onClick={SignOut}>Sign Out</button>
									{/*/////////////////*/}
								</div>
							</div>
						</div>
					</div>
					<div className="body">
						<div className="stories">
							<div className="story">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="story_img"
								/>
								<div className="story_hide">
									<p className="story_hide_p">Tạo tin</p>
								</div>
								<div className="story_plus">
									<AiOutlinePlus />
								</div>
							</div>
							<div className="story">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t15.5256-10/291685424_738039370735829_4547293726204764721_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=Neu45RqTQ70AX8tnM0H&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-Vh3e1v9RxgF28g-A1vYFf0O7A20LcFLhN2s5Qp8eG6Q&oe=62CA5B05"
									className="story_content_img"
								/>
								<div className="story_avatar">
									<img
										src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-1/181616114_317560206400564_521690371348948138_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=7mYHZyxmnsUAX89vL4X&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT909ccVrtyn7Tq6_70SjYSaDLxFrquIn0cJShIioALinQ&oe=62EAD787"
										className="story_img_avatar"
									/>
								</div>
								<p className="story_name">Thầy giáo ba</p>
							</div>
							<div className="story">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t15.5256-10/291685424_738039370735829_4547293726204764721_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=Neu45RqTQ70AX8tnM0H&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-Vh3e1v9RxgF28g-A1vYFf0O7A20LcFLhN2s5Qp8eG6Q&oe=62CA5B05"
									className="story_content_img"
								/>
								<div className="story_avatar">
									<img
										src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-1/181616114_317560206400564_521690371348948138_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=7mYHZyxmnsUAX89vL4X&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT909ccVrtyn7Tq6_70SjYSaDLxFrquIn0cJShIioALinQ&oe=62EAD787"
										className="story_img_avatar"
									/>
								</div>
								<p className="story_name">Thầy giáo ba</p>
							</div>
							<div className="story">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t15.5256-10/291685424_738039370735829_4547293726204764721_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=Neu45RqTQ70AX8tnM0H&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-Vh3e1v9RxgF28g-A1vYFf0O7A20LcFLhN2s5Qp8eG6Q&oe=62CA5B05"
									className="story_content_img"
								/>
								<div className="story_avatar">
									<img
										src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-1/181616114_317560206400564_521690371348948138_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=7mYHZyxmnsUAX89vL4X&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT909ccVrtyn7Tq6_70SjYSaDLxFrquIn0cJShIioALinQ&oe=62EAD787"
										className="story_img_avatar"
									/>
								</div>
								<p className="story_name">Thầy giáo ba</p>
							</div>
							<div className="story">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t15.5256-10/291685424_738039370735829_4547293726204764721_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=Neu45RqTQ70AX8tnM0H&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-Vh3e1v9RxgF28g-A1vYFf0O7A20LcFLhN2s5Qp8eG6Q&oe=62CA5B05"
									className="story_content_img"
								/>
								<div className="story_avatar">
									<img
										src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-1/181616114_317560206400564_521690371348948138_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=7mYHZyxmnsUAX89vL4X&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT909ccVrtyn7Tq6_70SjYSaDLxFrquIn0cJShIioALinQ&oe=62EAD787"
										className="story_img_avatar"
									/>
								</div>
								<p className="story_name">Thầy giáo ba</p>
							</div>
							<div className="story">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t15.5256-10/291685424_738039370735829_4547293726204764721_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=Neu45RqTQ70AX8tnM0H&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-Vh3e1v9RxgF28g-A1vYFf0O7A20LcFLhN2s5Qp8eG6Q&oe=62CA5B05"
									className="story_content_img"
								/>
								<div className="story_avatar">
									<img
										src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-1/181616114_317560206400564_521690371348948138_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=7mYHZyxmnsUAX89vL4X&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT909ccVrtyn7Tq6_70SjYSaDLxFrquIn0cJShIioALinQ&oe=62EAD787"
										className="story_img_avatar"
									/>
								</div>
								<p className="story_name">Thầy giáo ba</p>
							</div>
						</div>
						<div className="create">
							{/* <button type="submit" onClick={submitHandle}>
					Đăng
				</button> */}
							<div className="create_top">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8JlYypGvtdmI-6PV4Q1ns4zyuz97WNb6-CkTH_hMHjvQ&oe=62EA1BF8"
									className="create_top_img"
								/>
								<div className="create_input">
									<form
										onSubmit={(e) => submitHandle(e)}
										className="create_form"
									>
										<input type="file" onChange={(e) => uploadFile(e)} />
										<input
											type="text"
											placeholder={`${user?.email} ơi, bạn đang nghĩ gì thế?`}
											className="create_top_input"
											ref={inputRef}
											onChange={(e) => setInput(e.target.value)}
											value={input}
										/>
									</form>
								</div>
							</div>
							<div className="create_bot">
								<div className="create_bot_option">
									<AiFillVideoCamera className="create_bot_icon" />
									<p className="create_bot_text">Video trực tiếp</p>
								</div>
								<div className="create_bot_option">
									<AiFillVideoCamera className="create_bot_icon" />
									<p className="create_bot_text">Video trực tiếp</p>
								</div>
								<div className="create_bot_option">
									<AiFillVideoCamera className="create_bot_icon" />
									<p className="create_bot_text">Video trực tiếp</p>
								</div>
							</div>
						</div>
						<div className="meet">
							<div className="meet_create">
								<AiTwotoneVideoCamera className="meet_create_icon" />
								<p className="meet_text">Tạo phòng họp mặt</p>
							</div>
							<div className="meet_avatar">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="meet-avatar_img"
								/>
								<div className="meet_avatar_online"></div>
							</div>
							<div className="meet_avatar">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="meet-avatar_img"
								/>
								<div className="meet_avatar_online"></div>
							</div>
							<div className="meet_avatar">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="meet-avatar_img"
								/>
								<div className="meet_avatar_online"></div>
							</div>
							<div className="meet_avatar">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="meet-avatar_img"
								/>
								<div className="meet_avatar_online"></div>
							</div>
							<div className="meet_avatar">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="meet-avatar_img"
								/>
								<div className="meet_avatar_online"></div>
							</div>
							<div className="meet_avatar">
								<img
									src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6Kxsf75mj4cAX9D-gn6&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT-haMnS0jwM43og7FD2bd92_j-lPal9xcBIadQHCkRXNg&oe=62EA1BF8"
									className="meet-avatar_img"
								/>
								<div className="meet_avatar_online"></div>
							</div>
						</div>
						<div className="feed">
							/*//////////////////////////////////*/
							{status.map((info, index) => (
								<div key={index} className="status">
									<div className="status_header">
										<div className="status_header_left">
											<img
												src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/273579137_1643376666002521_4361558744678963548_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=104&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=gjWowDMX2mEAX9uMq1U&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_AKBqXOB5_8E7EOJaj14RDWOk_7yvBgdIcIdDZ3Grz0w&oe=62C997A4"
												className="status_header_left_img"
											/>
											<div className="status_header_left_title">
												<p>{info.name}</p>
												<span>23 giờ</span>
											</div>
										</div>
										<div className="status_right">
											<BsThreeDots />
										</div>
									</div>
									<p className="status_content">{info.content}</p>
									<img
										src={
											info.url
												? info.url
												: "https://external.fsgn2-2.fna.fbcdn.net/safe_image.php?w=680&h=354&url=https%3A%2F%2Fcoin68.com%2Fwp-content%2Fuploads%2F2022%2F07%2FnslKIT7S.jpg&cfs=1&ext=jpg&utld=coin68.com&_nc_oe=70676&_nc_sid=505865&_nc_o2e=1&ccb=3-6&_nc_hash=AQGWqAmP_qI0w_9H"
										}
										className="status_img"
									/>
									<div className="status_bot">
										<div className="status_bot_on">
											<div className="status_bot_on_emotion">
												<img
													src="https://symbols.vn/wp-content/uploads/2021/11/Bieu-tuong-like-PNG.png"
													className="status_like"
												/>
												<p>{info.like}</p>
											</div>
											<p className="status_bot_text">12 bình luận</p>
										</div>
										<div className="status_bot_below">
											<div className="status_option">
												<AiOutlineLike className="status_like_icon" />
												<p>Thích</p>
											</div>
											<div className="status_option">
												<AiOutlineLike className="status_like_icon" />
												<p>Thích</p>
											</div>
											<div className="status_option">
												<AiOutlineLike className="status_like_icon" />
												<p>Thích</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
