import { AspectRatio, Box, Heading, Img, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

const IframeContent = ({ children, ...props }) => (
    <AspectRatio ratio={16/9} {...props} mb={12}>
        <iframe src={props.src} />
    </AspectRatio>
);

function Content({ content, ...props }: { content: string } & any) {
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
                    component: Img,
                    props: {
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