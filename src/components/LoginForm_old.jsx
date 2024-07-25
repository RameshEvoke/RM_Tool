import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  return (
    <section className="flex-1 flex flex-row items-center justify-center py-[106.5px] px-5 box-border min-w-[468px] max-w-full mq675:pt-[69px] mq675:pb-[69px] mq675:box-border mq675:min-w-full">
      <form className="m-0 bg-white flex flex-col items-center justify-start gap-[20px] max-w-full">
        
        <Button
          className="self-stretch h-[45px] mq450:pl-5 mq450:pr-5 mq450:box-border"
          name="Log In"
          variant="primary"
          href="/dashboard"
          size="lg"
        >
          Log in With Evoke
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;
