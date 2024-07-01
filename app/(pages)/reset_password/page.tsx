import ResetPassword from "@/app/components/ResetPassword/ResetPassword";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return <ResetPassword />;
};

export default Page;
// export const dynamic = "force-static";
// import ResetPassword from "@/app/components/ResetPassword/ResetPassword";
// import { FC } from "react";

// interface PageProps {}

// const Page: FC<PageProps> = () => {
//   let token: string | null = null;

//   if (typeof window !== "undefined") {
//     const fullUrl = window.location.href;
//     const searchString = "reset_password/";
//     const index = fullUrl.indexOf(searchString);

//     if (index !== -1) {
//       token = fullUrl.substring(index + searchString.length);
//     } else {
//       console.log("The 'token' string was not found in the URL.");
//     }
//   }

//   console.log("token", token);

//   // @ts-ignore
//   return <ResetPassword token={token} />;
// };

// export default Page;
