import { Avatar, Card, CardContent, CardMedia, Checkbox, CircularProgress, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Comment from './Comment';
import Navbar from './Navbar';

const Pagination = () => {

    const [post, setpost] = useState([])
    const [hasmore, sethasmore] = useState(true)
    const page_limit = 2;
    const apipath = 'https://62983daaf2decf5bb73ddb37.mockapi.io/post';

    useEffect(() => {
        getpost()
    }, [])

    function getpost() {

        let pageno = Math.ceil(post.length / page_limit) + 1;
        const querypath = "?page=" + pageno + "&limit=" + page_limit
        const finalurl = apipath + querypath;
        axios.get(finalurl)
            .then(res => {
                let apires = res?.data;
                // console.log(res);
                if (res?.data?.length === 0) {
                    sethasmore(false)
                }
                const mergedata = [...post, ...apires]
                setpost(mergedata)
            }).catch((err) => {
                console.error("Error While Loading Post", err);
            })
    }

    return (
        <div>
            <Navbar />
           
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                <InfiniteScroll
                    dataLength={post?.length}
                    next={getpost}
                    hasMore={hasmore}
                    loader={<>
                    <CircularProgress/><h3>Loading Post....</h3></>}
                    endMessage="End">
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
                                    {
                                        <Comment postid={item.id} />
                                    }
                                </Card>)
                        })
                    }
                </InfiniteScroll>
            </Stack>
        </div>
    )
}

export default Pagination