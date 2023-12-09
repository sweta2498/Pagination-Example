import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const Pagination_simple = () => {

  const [post, setpost] = useState([])
  const [page, setPage] = useState(1);
  const page_limit = 3;
  const apipath = 'https://62983daaf2decf5bb73ddb37.mockapi.io/post';

  useEffect(() => {
    window.addEventListener('scroll', betterfunction);
    return ()=>{
      window.removeEventListener('scroll', betterfunction);
    }
  }, [])

  useEffect(()=>{
    getpost();
  },[page])

  // console.log("ll",page);
  function getpost() {
    let pageno = Math.ceil(post.length / page_limit) + 1;
    const querypath = "?page=" + page + "&limit=" + page_limit
    const finalurl = apipath + querypath;
    axios.get(finalurl)
      .then(res => {
        let apires = res?.data;
        console.log(res);
        const mergedata = [...post, ...apires]
       
        console.log(page);
        setpost(mergedata)
      }).catch((err) => {
        console.error("Error While Loading Post", err);
      })
  }

  const betterfunction = MyDebounce(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // showdata()
      setPage(prev=> prev=prev+1);
      console.log("Hello...!!!");
    }
  }, 2000);


  function MyDebounce(call, d) {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        console.log("hello");
        call();
      }, d)
    }
  }
 

  return (
    <div>
      <Navbar />
      <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
        {
          (post && post?.length > 0) ? 
          <>
          {
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
          </> : <h1>Post Not Found</h1>

        }

      </Stack>
    </div>
  )
}

export default Pagination_simple


// {post && post?.length > 0 &&
//   post?.map((item, i) => {
//     return (
//       <Card sx={{ width: "320px", my: 2, mx: 10 }} key={item.id + i} >
//         <CardContent>
//           <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.userphoto} />
//           <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>
//         </CardContent>
//         <CardMedia component="img"
//           height="250"
//           image={item.photo}
//           alt='green iguana' />
//         <CardContent>
//           <Typography mt={-1} variant='subtitle1' align='left'>{item.caption}</Typography>
//         </CardContent>
//       </Card>)
//   })
// }
// {
//   post == null ?
//     <h2>No Data Found..!!!</h2>
//     :
//     null
// }