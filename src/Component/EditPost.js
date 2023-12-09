import { Avatar, Box, Button, Card, CardContent, CardMedia, Checkbox, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Comment from './Comment';
import { ActionType } from '../Action_Type';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';

const Editpost = () => {
    let { postdata, dispatchpost } = useContext(UserContext);
    const [ldata, setldata] = useState()
    const userid = ldata?.id;
    const username = ldata?.name
    const userphoto = ldata?.profilephoto
    const navigate = useNavigate()
    const [photo, setphoto] = useState("")
    const date = new Date().toLocaleDateString();
    postdata = postdata.filter(item => item.userid === ldata?.id);
   
    useEffect(() => {
        let time1 = localStorage.getItem('token');
        const time = JSON.parse(time1);
        setldata(time)
    }, [])

    const editbtn = (id) => {
        navigate("/updatepost/" + id)
    }

    return (
        <div>
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                {
                    postdata?.map((item, i) => {
                        return (
                            <Card sx={{ width: "320px", my: 2, mx: 10 }} key={item.id+i}>
                                <CardContent>
                                    <EditIcon sx={{mr:-35,mb:-3}} onClick={()=>editbtn(item.id)}/>
                                    <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.userphoto} />
                                    <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>
                                </CardContent>
                                <CardMedia component="img"
                                    height="250"
                                    image={item.photo}
                                    alt='green iguana' />

                                <CardContent>
                                    <Typography mt={-1} variant='subtitle1' align='left'>{item.caption}</Typography>
                                </CardContent>
                                {
                                    <Comment postid={item.id} />
                                }
                            </Card>)
                    })
                }
            </Stack>
        </div>
    )
}

export default Editpost;