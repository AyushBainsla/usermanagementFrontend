import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import API from "@/helpers/api";

export default function CandidateOnboardingForm({ action }) {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [formLabel, setFormLabel] = useState("Candidate Onboarding Form");

  useEffect(() => {
    if (action === "edit" && id) {
      setFormLabel("Edit Candidate");
    //   axios.get(`http://localhost:9006/candidate/${id}`)
    //     .then((response) => {
    //       reset(response.data);  // populate the form with fetched data
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching candidate data:", error);
    //     });
    }
  }, [action, id, reset]);

  const onSubmit = (data) => {
    console.log('data =>', data)
    // if (action === "edit") {
    //   API.apiPut(`http://localhost:3000/api/users/register`, data)
    //     .then(() => {
    //       setSuccessMessage("Candidate details updated successfully!");
    //     })
    //     .catch((error) => {
    //       console.error("Error updating candidate:", error);
    //     });
    // } else {
    //   API.apiPost("http://localhost:9006/candidate", data)
    //     .then(() => {
    //       setSuccessMessage("Candidate onboarded successfully!");
    //       reset();
    //     })
    //     .catch((error) => {
    //       console.error("Error onboarding candidate:", error);
    //     });
    // }
    API.apiPost(`http://localhost:3000/api/users/register`, data)
      .then(() => {
        setSuccessMessage("Candidate details updated successfully!");
      })
        .catch((error) => {
          console.error("Error updating candidate:", error);
      });
  };

  return (
    <div className="p-8">
      <Card className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="h5 text-center mb-4">{formLabel}</h2>

        {successMessage && (
          <div className="alert alert-success mb-4" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Full Name Field */}
          <div className="mb-3">
            <Label htmlFor="full_name" className="form-label">Full Name</Label>
            <Input
              id="full_name"
              type="text"
              {...register("full_name", { required: "Full Name is required" })}
              className="form-control"
            />
            {errors.fullName && <p className="text-danger small">{errors.fullName.message}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <Label htmlFor="email" className="form-label">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address"
                }
              })}
              className="form-control"
            />
            {errors.email && <p className="text-danger small">{errors.email.message}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="mb-3">
            <Label htmlFor="phone" className="form-label">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number"
                }
              })}
              className="form-control"
            />
            {errors.phone && <p className="text-danger small">{errors.phone.message}</p>}
          </div>

          {/* Position Field */}
          {/* <div className="mb-3">
            <Label htmlFor="position" className="form-label">Position</Label>
            <Input
              id="position"
              type="text"
              {...register("position", { required: "Position is required" })}
              className="form-control"
            />
            {errors.position && <p className="text-danger small">{errors.position.message}</p>}
          </div> */}

          {/* Start Date Field */}
          <div className="mb-3">
            <Label htmlFor="dob" className="form-label">DOB</Label>
            <Input
              id="dob"
              type="date"
              {...register("dob", { required: "Start date is required" })}
              className="form-control"
            />
            {errors.dob && <p className="text-danger small">{errors.dob.message}</p>}
          </div>

          {/* Notes Field */}
          <div className="mb-3">
            <Label htmlFor="additional_notes" className="form-label">Notes</Label>
            <Textarea
              id="additional_notes"
              {...register("additional_notes")}
              placeholder="Additional notes about the candidate"
              className="form-control"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="btn btn-primary w-100">
            {action === "edit" ? "Update Candidate" : "Onboard Candidate"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
