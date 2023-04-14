import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FieldValues = {
  username: String;
  email: String;
  password: String;
};
let a = 0;
export const YouTubeForm = () => {
  const form = useForm<FieldValues>({
    
    defaultValues:async () => {
      const res =await fetch("https://jsonplaceholder.typicode.com/users/2");
      const data =await res.json();
      console.log(data);
   return{
      username: 'chichi',
      email: data.email, 
      password: 'password'
    }}
  });            //fetch data

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  a++;
  return (
    <div>
      <h1>YouTube Form ({a / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true, maxLength: 20 })}
          />
        </div>
        {errors.username?.type === "required" && ( //error
          <p className="error">Usename is required</p>
        )}

        <div className="input">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email Address is required",
              },
                                                     
              validate:{                         //custom validate________
                notAdmin:(fieldValue) => {              
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter a difference Email address"
                  );
                },
                emailAvailable: async (fieldValue) => {
                    const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                    const data = await res.json();
                    console.log(data)
                      return data.length === 0 || "Email already exists";
                },
               }
              },
            )
          }
          />
        </div>
        <p className="error">{errors.email?.message}</p>

        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password?.type === "required" && (
          <p className="error">Password is required</p>
        )}

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
