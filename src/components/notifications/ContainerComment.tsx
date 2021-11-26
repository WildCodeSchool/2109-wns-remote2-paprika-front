import React from "react";

import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
      <Box
            sx={{
          bgcolor: '#F2F2F2',
          color: 'black',
          p: 1,
          m: 1,
          borderRadius: 1,
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }

const ContainerComment = () => {
    return (
        <Box
            sx={{
            display: 'flex',
            alignItems: 'flex-start',
                flexDirection: 'column',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            }}
            style={{ width: '100%' }}
        >
            <Item className="item-list" style={{ paddingLeft: 210 , width: 'Inherit'}}>
                <h2>Project | Tasks</h2>
                <Box sx={{ display: 'flex', flexDirection: 'row'}} >
                    <Item sx={{display: 'inline-block'}}><span className="round round-red"></span> </Item>
                    <Item sx={{display: 'inline-block'}}>name comment</Item>
                    <Item sx={{display: 'inline-block', marginLeft: 'auto'}}>17 / 12 / 2021</Item>
                </Box>
                    <p>Le deploiement a foiré.. Pepperoni a vraiment fait d’la merde, @JalapenosGarcia, il faudra it que tu t’en occupe, car le client est vénère de ouf...
                    J’ai aucune nouvelle de lui, depuis hier ! C’est vraiment un branque ce type !</p>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}} >
                        <Item sx={{display: 'inline-block'}}><span className="round round-red"></span> </Item>
                        <Item sx={{display: 'inline-block'}}><p>Gimgembre change the status to prioritary</p></Item>
                        <Item sx={{display: 'inline-block', marginLeft: 'auto'}}>18 / 12 / 2021</Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row'}} >
                        <Item sx={{display: 'inline-block'}}><span className="round round-green"></span> </Item>
                        <Item sx={{display: 'inline-block'}}><p>Tabascco add enclosed</p></Item>
                        <Item sx={{display: 'inline-block', marginLeft: 'auto'}}>18 / 12 / 2021</Item>
                    </Box>

            </Item> 
            <Item className="item-list" style={{ paddingLeft: 210, width: 'Inherit' }}>
            <h2>Project | Tasks</h2>
                <Box sx={{ display: 'flex', flexDirection: 'row'}} >
                    <Item sx={{display: 'inline-block'}}><span className="round round-blue"></span> </Item>
                    <Item sx={{display: 'inline-block'}}>name comment</Item>
                    <Item sx={{display: 'inline-block', marginLeft: 'auto'}}>17 / 12 / 2021</Item>
                </Box>
            </Item>
            <Item className="item-list" style={{ paddingLeft: 210, width: 'Inherit' }}>
            <h2>Project | Tasks</h2>
                <Box sx={{ display: 'flex', flexDirection: 'row'}} >
                    <Item sx={{display: 'inline-block'}}><span className="round round-green"></span> </Item>
                    <Item sx={{display: 'inline-block'}}>name comment</Item>
                    <Item sx={{display: 'inline-block', marginLeft: 'auto'}}>17 / 12 / 2021</Item>
                </Box>
            </Item>
        </Box>
    )
}

export default ContainerComment