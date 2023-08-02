import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import {
    Box,
    Button,
    Card,
    CardActions,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    SvgIcon
} from '@mui/material';
import * as React from "react";

const SimpleEventList = (props: any) => {
    const {products = [], sx} = props;

    return (
        <Card>
            <List>
                {products.map((product: any, index: any) => {
                    const hasDivider = index < products.length - 1;

                    return (
                        <ListItem
                            divider={hasDivider}
                            key={product.id}
                        >
                            <ListItemAvatar>
                                {
                                    product.image
                                        ? (
                                            <Box
                                                component="img"
                                                src={product.image}
                                                sx={{
                                                    borderRadius: 1,
                                                    height: 50,
                                                    width: 100,
                                                    marginRight: 5
                                                }}
                                            />
                                        )
                                        : (
                                            <Box
                                                sx={{
                                                    borderRadius: 1,
                                                    backgroundColor: 'neutral.200',
                                                    height: 48,
                                                    width: 48
                                                }}
                                            />
                                        )
                                }
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                primaryTypographyProps={{variant: 'subtitle1'}}
                                secondaryTypographyProps={{variant: 'body2'}}
                            />
                            <IconButton edge="end">
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider/>
        </Card>
    );
};

SimpleEventList.propTypes = {
    products: PropTypes.array,
    sx: PropTypes.object
};

export default SimpleEventList;