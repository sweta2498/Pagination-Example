import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Content, Loading } from './App.styles';
import Navbar from './Navbar';



const Paginate = () => {

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [post, setpost] = useState([])

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prev => prev + 1);
        }
    };

    const getUsers = async (page) => {
        const users = await (
            await fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post?page=${page}&limit=2`)
        ).json();
        console.log("Hello..!!");
        return users;
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            //   getUsers()
            //   getpost()
            const newUsers = await getUsers(page);
            //   console.log(newUsers);
            setpost((prev) => [...prev, ...newUsers]);
            //   setUsers(newUsers);
            setLoading(false);
        };
        loadUsers();
    }, [page]);

    return (
        <div>
            <Navbar />
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                <Content onScroll={handleScroll}>
                    {post && post?.length > 0 &&
                        post?.map((item, i) => {
                            return (
                                <Card sx={{ width: "320px", my: 2, mx: 10 }} key={item.id + i} >
                                    <CardContent>
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
                                </Card>)
                        })
                    }
                    {/* </div> */}
                </Content>
                {loading && <Loading>Loading ...</Loading>}
            </Stack>
        </div>
    )
}

export default Paginate