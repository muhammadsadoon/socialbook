"use client";
import { Image, SimpleGrid, Box, Text } from "@mantine/core";
import { PhotoView, PhotoProvider } from "react-photo-view";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
    images: string[];
}

export default function PostImageGrid({ images }: Props) {
    if (!images || images.length === 0) return null;

    const isMobile = useMediaQuery("(max-width: 768px)");
    const count = images.length;

    const MAX = {
        single: isMobile ? 280 : 420,
        grid: isMobile ? 160 : 220,
    };

    // 🔹 reusable image wrapper
    const ImageWrapper = ({
        children,
    }: {
        children: React.ReactNode;
    }) => (
        <Box
            bg="gray.2"
            w="100%"
            display="flex"
            style={{ overflow: "hidden" }}
            className="items-center justify-center"

        >
            {children}
        </Box>
    );

    // ---------- 1 IMAGE ----------
    if (count === 1) {
        return (
            <PhotoProvider>
                <ImageWrapper>
                    <PhotoView src={images[0]}>
                        <Image
                            src={images[0]}
                            w="100%"
                            mah={MAX.single}
                            fit="contain"
                            style={{ cursor: "zoom-in" }}
                        />
                    </PhotoView>
                </ImageWrapper>
            </PhotoProvider>
        );
    }

    // ---------- 2 IMAGES ----------
    if (count === 2) {
        return (
            <SimpleGrid cols={2} spacing={4}>
                <PhotoProvider>
                    {images.map((img, i) => (
                        <ImageWrapper key={i}>
                            <PhotoView src={img}>
                                <Image
                                    src={img}
                                    w="100%"
                                    mah={MAX.grid}
                                    fit="cover"
                                    style={{ cursor: "zoom-in" }}
                                />
                            </PhotoView>
                        </ImageWrapper>
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
                        <ImageWrapper>
                            <Image
                                src={images[0]}
                                w="100%"
                                mah={MAX.single}
                                fit="cover"
                                style={{ cursor: "zoom-in" }}
                            />
                        </ImageWrapper>
                    </PhotoView>

                    <SimpleGrid cols={1} spacing={4}>
                        {images.slice(1).map((img, i) => (
                            <PhotoView key={i} src={img}>
                                <ImageWrapper>
                                    <Image
                                        src={img}
                                        w="100%"
                                        mah={MAX.grid}
                                        fit="cover"
                                        style={{ cursor: "zoom-in" }}
                                    />
                                </ImageWrapper>
                            </PhotoView>
                        ))}
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
                            <ImageWrapper>
                                <PhotoView src={img}>
                                    <Image
                                        src={img}
                                        w="100%"
                                        mah={MAX.grid}
                                        fit="cover"
                                        style={{ cursor: "zoom-in" }}
                                    />
                                </PhotoView>
                            </ImageWrapper>

                            {i === 3 && extra > 0 && (
                                <Box
                                    pos="absolute"
                                    inset={0}
                                    bg="rgba(0,0,0,0.6)"
                                    display="flex"
                                    className="items-center justify-center"
                                    style={{ borderRadius: 8 }}
                                >
                                    <PhotoView src={img}>
                                        <Text c="white" size={isMobile ? "lg" : "xl"} fw={700}>
                                            +{extra}
                                        </Text>
                                    </PhotoView>
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </PhotoProvider>
        </SimpleGrid>
    );
}
