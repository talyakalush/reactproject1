import WebhookIcon from "@mui/icons-material/Webhook";
import { Box } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Box
      style={{ backgroundColor: "antiquewhite", borderRadius: "10px", mb: 5 }}
    >
      <h1 className="h1">
        About us <WebhookIcon />{" "}
      </h1>
      <p style={{ fontSize: "20px", textAlign: "center" }}>
        Welcome to our website! We offer an online platform that allows users to
        create and manage their business or personal cards easily and
        user-friendly. By registering on the site, you can access a personalized
        dashboard where you can view and interact with your created cards. If
        you have a business account, you can also create, edit, and delete your
        cards. Additionally, you can explore and like cards of other businesses
        and save your favorite cards in the "Favorites" section.Pay attention to
        the security of the site on this site if you try to log in three times
        and you have a login error you will be blocked for 24 hours and the site
        automatically disconnects after 24 hours. We strive to provide a
        seamless and enjoyable experience for our users. If you have any
        questions or feedback, feel free to reach out to our support team.
      </p>
      <video width="320" height="240" controls>
        <source src="..//assets/video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default AboutUsPage;
