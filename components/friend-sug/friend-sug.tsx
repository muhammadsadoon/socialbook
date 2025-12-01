import React from 'react'
import { Carousel } from '@mantine/carousel';
import { Paper } from '@mantine/core';
const FriendSugComponent = () => {
    return (
        <div>
            <Carousel height={300}>
                <Carousel.Slide w={300}>
                    <Paper className='h-full w-1/4'>
                        1
                    </Paper>
                </Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
                <Carousel.Slide>3</Carousel.Slide>
            </Carousel>
        </div>
    )
}

export default FriendSugComponent;