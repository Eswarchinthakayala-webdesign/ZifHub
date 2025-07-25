import {FaGithub, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube} from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://github.com/Eswarchinthakayala-webdesign">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/eswar-chinthakayala-536a91341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
          <FaLinkedin size={20} />
        </a>
        <a href="https://x.com/VIRATPHILE06?s=09">
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;