"use client";
import { Image, SimpleGrid, Box, Text } from "@mantine/core";
import { PhotoView, PhotoProvider } from 'react-photo-view';
interface Props {
    images: string[];
}

export default function PostImageGrid({ images }: Props) {
    if (!images || images.length === 0) return null;

    const count = images.length;

    // ---------- 1 IMAGE ----------
    if (count === 1) {
        return (
            <PhotoProvider>
                <PhotoView src={images[0]}>
                    <Image
                        src={images[0]}
                        height={300}
                        radius="md"
                        fit="cover"
                    />
                </PhotoView>
            </PhotoProvider>
        );
    }

    // ---------- 2 IMAGES ----------
    if (count === 2) {
        return (
            <SimpleGrid cols={2} spacing={4}>
                <PhotoProvider>
                    {images.map((img, i) => (
                        <PhotoView key={i} src={img}>
                            <Image src={img} height={200} fit="cover" radius="md" />
                        </PhotoView>
                    ))}
                </PhotoProvider>
            </SimpleGrid>
        );
    }

    // ---------- 3 IMAGES ----------
    if (count === 3) {
        return (
            <SimpleGrid cols={2} spacing={4}>
                <PhotoProvider>
                    <PhotoView src={images[0]}>
                        <Image src={images[0]} height={300} fit="cover" radius="md" />
                    </PhotoView>
                    <SimpleGrid cols={1} spacing={4}>
                        <PhotoView src={images[1]}>
                            <Image src={images[1]} height={148} fit="cover" radius="md" />
                        </PhotoView>
                        <PhotoView src={images[2]}>
                            <Image src={images[2]} height={148} fit="cover" radius="md" />
                        </PhotoView>
                    </SimpleGrid>
                </PhotoProvider>
            </SimpleGrid>
        );
    }

    // ---------- 4 OR MORE ----------
    return (
        <SimpleGrid cols={2} spacing={4}>
            <PhotoProvider>
                {images.slice(0, 4).map((img, i) => {
                    const extra = count - 4;
                    return (
                        <Box key={i} pos="relative">
                            <Box className="h-64 overflow-hidden">
                                <PhotoView src={img}>
                                    <Image src={img} height={150} fit="cover" radius="md" />
                                </PhotoView>
                            </Box>
                            {i === 3 && extra > 0 && (

                                <PhotoView src={img} >
                                    <Box
                                        pos="absolute"
                                        top={0}
                                        left={0}
                                        w="100%"
                                        h="100%"
                                        bg="rgba(0,0,0,0.6)"
                                        style={{ borderRadius: 8 }}
                                        display="flex"
                                        className="justify-center items-center"
                                    >
                                        <Text c="white" size="xl" fw={700}>
                                            +{extra}
                                        </Text>

                                    </Box>
                                </PhotoView>
                            )}
                        </Box>
                    );
                })}
            </PhotoProvider>
        </SimpleGrid>
    );
}
