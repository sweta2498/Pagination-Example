import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { ActionType } from '../Action_Type';
import { UserContext } from '../App';

const NewPost = () => {
    const { dispatchpost } = useContext(UserContext);
    const [name, setName] = useState("")
    const [caption, setCaption] = useState("")
    const [photo, setphoto] = useState("")
    const [data,setdata]=useState()
    const navigate = useNavigate();
    const date = new Date().toLocaleDateString();
   
    const userid=data?.id
    const username=data?.name
    const userphoto=data?.profilephoto

    useEffect(() => {
        let time1 = localStorage.getItem('token');
        const time = JSON.parse(time1);
        setdata(time)
    }, [])
    
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setphoto(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function addpost() {
        // console.log("1",name,"1");
        const data = { name, caption, photo, userid, username, userphoto, date };
        console.log("data post 00--",data);
        if (name === '' || caption === '' || photo === '') {
            console.log("Enter Value");
        }
        else {
            fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/post",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then((result) => {
                    let postdata=localStorage.getItem('post')
                    let post=JSON.parse(postdata)
                    let anc = post.concat(result)
                    console.log((anc));
                    localStorage.setItem("post",JSON.stringify(anc))
                    dispatchpost({type:ActionType.SET_NEW_POST,payload:result})
                    navigate('/posts');
                    alert("success");
                }) 
        }
    }
    return (
        <div>
            <Box sx={{
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                flexDirection: 'column',
                height:'100vh',
                width: '100vh',
                m: 10
            }}>

                <TextField
                    label="Name"
                    variant="outlined" 
                    fullWidth
                    onChange={e => setName(e.target.value.trim())}
                    sx={{ m: 1 }} />

                <TextField
                    label="Caption"
                    value={caption}
                    fullWidth
                    onChange={e => setCaption(e.target.value.trim())}
                    sx={{ m: 1 }} />

                <TextField
                    fullWidth
                    type='file'
                    label='Choose Photo'
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        uploadImage(e);
                    }}
                    sx={{ m: 1 }} />


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                m: 10

            }}>
                <Button
                    sx={{ mt: -6 }}
                    variant='outlined'
                    onClick={addpost}>Add Post</Button>
            </Box>
            
            </Box></div>
    )
}

export default NewPost