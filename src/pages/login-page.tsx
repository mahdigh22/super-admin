import { useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-96 h-96 shadow-md p-5 flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center ">Sign In</h1>
        <Input label={"Email"} variant="outlined" placeholder={"Email"} />
        <Input label={"Password"} variant="outlined" placeholder={"Password"} />
        <a href="/store" className="w-full">
          <Button
            className="w-full"
            onClick={() => {
              navigate({ to: "/store" });
            }}
          >
            Sign In
          </Button>
        </a>
      </Card>
    </div>
  );
}
