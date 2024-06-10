import styled from "@emotion/styled";
import { FlexWrapper } from "../../shared/ui/flexWrapper/FlexWrapper";

export const OutputDataWrapper = styled(FlexWrapper)`
    flex: 0 0 400px;
    max-width: 400px;
    height: 100%;
    align-items: flex-start;
    overflow: auto;
    word-wrap: break-word;
    overflow-wrap: anywhere;
`;