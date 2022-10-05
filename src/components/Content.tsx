import { AspectRatio, Box, Heading, Img, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import { Club } from "contentlayer/generated";
import Markdown from "markdown-to-jsx";
import { clubAssetURL } from "src/utils";

const IframeContent = ({ children, ...props }) => (
    <AspectRatio ratio={16/9} {...props} mb={12}>
        <iframe src={props.src} />
    </AspectRatio>
);

// regex used to detect if src should use content images path or not
const urlRegex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

const ImageContent = ({ children, src, club, ...props }) => (
    <Img src={urlRegex.test(src) ? clubAssetURL(club, 'content_images', src) : src} {...props} />
)

function Content({ content, club, ...props }: { content: string, club: Club } & any) {
    return <Markdown
        options={{
            wrapper: Box,
            overrides: {
                h1: {
                    component: Heading,
                    props: {
                        mb: "2"
                    }
                },
                h2: {
                    component: Heading,
                    props: {
                        mb: "2"
                    }
                },
                h3: {
                    component: Heading,
                    props: {
                        mb: "2"
                    }
                },
                li: {
                    component: ListItem,
                    props: {
                        fontSize: "lg"
                    }
                },
                ul: {
                    component: UnorderedList
                },
                ol: {
                    component: OrderedList
                },
                p: {
                    component: Text,
                    props: {
                        fontSize: "lg",
                        mb: "8"
                    }
                },
                img: {
                    component: ImageContent,
                    props: {
                        club,
                        my: "8",
                        width: "full"
                    }
                },
                iframe: {
                    component: IframeContent
                }
            }
        }}>
        {content}
    </Markdown>
}

export default Content;