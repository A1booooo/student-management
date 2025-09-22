import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { login as loginApi } from "../../services/apiAuth";

export default function Login() {
  const Navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: () => {
      toast.success("Login successful");
      setTimeout(() => {
        Navigate("/home/score");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
  })
  .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  function onSubmit(data) {
    login({ email: data.email, password: data.password });
  }

  return (
    <form
      className="w-1/3 mx-auto text-center shadow-xl mt-40 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold">Sunshine</h1>
      <label className="input validator input-lg mx-2 my-2">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input
          type="email"
          placeholder="mail@site.com"
          required
          {...register("email")}
        />
      </label>
      <p className="text-red-500">{errors.email?.message}</p>
      <br />
      <label className="input validator input-lg mx-2 my-2">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          type="password"
          required
          placeholder="Password"
          {...register("password")}
        />
      </label>
      <p className="text-red-500">{errors.password?.message}</p>
      <div className="flex items-center justify-around">
        <label className="label">
          <input type="checkbox" defaultChecked className="checkbox" />
          Remember me
        </label>
        <button className="btn btn-link">Forgetten password?</button>
      </div>
      <br />
      <button className="btn btn-primary mx-2 my-2" disabled={isLoggingIn}>Login</button>
      <button
        className="btn btn-warning mx-2 my-2"
        onClick={() => Navigate("/signup")}
        disabled={isLoggingIn}
      >
        Sign Up
      </button>
    </form>
  );
}
