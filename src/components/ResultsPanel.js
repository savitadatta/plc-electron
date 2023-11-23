import './ResultsPanel.css';

import React, { useState, useEffect } from 'react';
import {
    Box,
    List,
    Divider,
    ListItemButton,
    ListItemText
} from '@mui/material';

const ResultsPanel = ({ results, handleListItemClick, selectedIndex }) => {
    const [ children, setChildren ] = useState([]);
    var temp = [];

    const addChildren = (list, startIndex, noResultsMessage) => {
        if (list.length > 0) {
            temp.push(
                <List component="nav">
                    {list.map((result, index) => {
                        console.log(`result ${index}: ${result}`);
                        return (
                            <ListItemButton
                                key={ result }
                                selected={ selectedIndex === index + startIndex }
                                onClick={(event) => handleListItemClick(event, index + startIndex)}
                                >
                                <ListItemText primary={ result } />
                            </ListItemButton>
                        )
                    })}
                </List>
            );
        } else {
            console.log(noResultsMessage);
            temp.push(
                <List component="nav">
                    <ListItemButton key={ noResultsMessage } selected={ false }>
                        <ListItemText primary={ noResultsMessage } />
                    </ListItemButton>
                </List>
            );
        }
    }

    useEffect(() => {
        if (!(Array.isArray(results)) || results.length !== 3
            || results.some((sublist) => {return !Array.isArray(sublist)})) {
            console.log("error retrieving results");
            temp = [<h2>Error retrieving results</h2>];
        } else {
            console.log("checks okay");
            const [ local, dropbox, archive ] = results;
            temp = [];
            addChildren(local, 0, "No local results");
            temp.push(<Divider />);
            addChildren(dropbox, local.length, "No results in Dropbox");
            temp.push(<Divider />);
            addChildren(archive, local.length + dropbox.length, "No results in archive");
        }
        setChildren(temp);
    }, [ results ])

    return (<div className="results">
        <Box sx={{
            bgcolor: 'background.paper',
            height: 400
            }}>
            { children }
        </Box>
    </div>);
}


export default ResultsPanel;
