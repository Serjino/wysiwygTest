import styled from "@emotion/styled";
import { FlexWrapper } from "../../shared/ui/flexWrapper/FlexWrapper";

export const InputEditorWrapper = styled(({section = true, gap = 2, ...props}) => 
    <FlexWrapper section={section} gap={gap} {...props}/>) 
(({
        theme
    }) => {
    return {
        alignItems: "flex-start",
        height: `calc(100% - ${theme.spaces.sectionY} - 86px)`,
        width: "100%",
    };
});
