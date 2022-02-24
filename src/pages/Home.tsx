import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Navigation from "../components/Navigation";
function Home(props:any) {
    const [ isLogged, setIsLogged ] = props;
    return (
        <div className="home">
            <Navigation />
            <h1>home page</h1>
            <div className="big-container-wrapper">
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                    <Box className="container-wrapper card-container"><h2>Priorities</h2>
                        <Box>Toutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemo.
                        </Box>
                    </Box>
                    <Box className="container-wrapper card-container"><h2>Project List</h2>
                        <Box>Toutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemo.
                        </Box>
                    </Box>
                    <Box className="container-wrapper card-container"><h2>Project Tasks</h2>
                        <Box>Toutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemoToutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemoToutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemo.
                        </Box>
                    </Box>
                    <Box className="container-wrapper card-container"><h2>Documentation</h2>
                        <Box>Toutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, volsicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemoToutes les priorités Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut perferendis, voluptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemo.uptatibus aliquam minus hic suscipit tempore nesciunt est tenetur distinctio, cum eius provident perspiciatis magni quasi. Aliquam, atque nemo.
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default Home;