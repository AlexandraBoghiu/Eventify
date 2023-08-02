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

const Invite = (props: any) => {
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
                                                    height: 48,
                                                    width: 48
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
                            <Button
                                type="submit"
                                size='medium'
                                variant="contained"
                                sx={{
                                    mt: 1, mb: 1, backgroundColor: '#6b549c',
                                    '&:hover': {
                                        backgroundColor: '#3a2d57',
                                    }
                                }}
                            >
                                Invite
                            </Button>
                            <IconButton edge="end">
                                <SvgIcon>
                                    <MoreVertIcon/>
                                </SvgIcon>
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightAltIcon/>
                        </SvgIcon>
                    )}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </CardActions>
        </Card>
    );
};

Invite.propTypes = {
    products: PropTypes.array,
    sx: PropTypes.object
};

export default Invite;