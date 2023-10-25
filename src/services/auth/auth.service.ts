// import axios from "../../config/axios.ts";
// import {login} from "../../features/auth/authSlice.ts";
// import Swal from "sweetalert2";


// export postLogin = (formDataEncrypt) =>{
//     axios.post('auth/login', formDataEncrypt).then((res)=>{
//         if(res.status === 200){
//             const loginInfo: LoginInfo = formData;
//             loginInfo.access_token = res.data.access_token;
//             dispatch(login(loginInfo))
//             navigate('/sport-commerce/home')
//         }
//     }).catch((e)=>{
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: e.response.data.message+', please verify your information account',
//         })
//         setFormData({
//             username: formData.username,
//             password: '',
//         })
//     })
// }