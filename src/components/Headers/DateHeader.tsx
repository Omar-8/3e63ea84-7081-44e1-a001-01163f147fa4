import { styled, alpha } from "@mui/material/styles";
import StickyHeadroom from "@integreat-app/react-sticky-headroom";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { Box } from "@mui/material";
import { CustomDateOptions } from "../../store/utils";

interface DateProps {
  date: string;
}

const StyledHeader = styled(Box)<{ stickyTop?: number }>(
  ({ theme, stickyTop }) => ({
    position: "sticky",
    top: `${stickyTop}px`,
    padding: "10px 10px",
    backgroundColor: alpha(theme.palette.common.white, 1),
    transition: "top 0.2s ease-out",
    width: "100%",
    zIndex: 1,
  })
);

const DateHeader: FC<DateProps> = ({ date }) => {
  const [stickyTop, setStickyTop] = useState(0);

  const onStickyTopChanged = (stickyTop: number) => {
    setStickyTop(stickyTop);
  };
  return (
    <>
      <StickyHeadroom
        pinStart={200}
        height={64}
        scrollHeight={0}
        onStickyTopChanged={onStickyTopChanged}
        zIndex={1}
      >
        <div />
      </StickyHeadroom>
      <StyledHeader sx={{ boxShadow: 1 }} stickyTop={stickyTop}>
        <Typography
          variant="h6"
          style={{ fontWeight: "bold" }}
          color={(theme) => theme.palette.primary.main}
          component="div"
        >
          {new Date(date)
            .toLocaleDateString("en-us", CustomDateOptions)
            .toUpperCase()
            .replaceAll(",", "")}
        </Typography>
      </StyledHeader>
    </>
  );
};

export default DateHeader;
