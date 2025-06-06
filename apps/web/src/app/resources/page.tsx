import { redirect } from "next/navigation";

// When hitting "/resources",
// redirect to the default sub-page.
export default function ResourcesIndex() {
    // Redirect to overview; you can change this to any default.
    redirect("/resources/overview");
}
