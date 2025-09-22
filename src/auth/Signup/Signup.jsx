import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { signup as signupApi } from "../../services/apiAuth";
import { createTeacher as createTeacherApi } from "../../services/apiTeacher";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export default function Signup() {
  const Navigate = useNavigate();

  const { mutate: createTeacher, isPending: isCreatingTeacher } = useMutation({
    mutationFn: ({ teacher_id }) => createTeacherApi({ teacher_id }),
    onSuccess: () => {
      toast.success('Signup successful');
      setTimeout(() => {
        Navigate("/login");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password }) => signupApi(email, password),
    onSuccess: (signupData) => {
      createTeacher({ teacher_id: signupData.user.id });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isLoading = isSigningUp || isCreatingTeacher;
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({email, password}) => {
    signup({email, password});
  };

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
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
      </label>
      <p className="text-red-500">{errors.confirmPassword?.message}</p>
      <br />

      <button className="btn btn-warning mx-2 my-2" type="submit" disabled={isLoading}>
        Sign Up
      </button>
      <button
        className="btn btn-primary mx-2 my-2"
        onClick={() => Navigate("/login")}
        disabled={isLoading}
      >
        Login
      </button>
    </form>
  );
}
