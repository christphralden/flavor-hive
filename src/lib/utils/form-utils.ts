export const FormPlaybook = {
  name: {
    required: "Name is required",
    pattern: /^[A-Za-z0-9\s]+$/i,
  },
  username: {
    required: "Username is required",
    pattern: /^[A-Za-z0-9]+$/i,
  },
  email: {
    required: "Email is required",
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    required: "Password is required",
    maxLength: {
      value: 30,
      message: "Password must be less than 30 characters",
    },
    minLength: {
      value: 8,
      message: "Password must be longer than 8 characters",
    },

    // pattern: {
    //     value: /^[A-Za-z0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
    //     message: 'Passwords must containes uppercase, alphanumeric, and a symbol'
    // }
  },
  // confirmPassword:{ TODO:pake ini di component
  //     validate: (value:string, before:string) => value === before || "Passwords do not match"
  // },
  // dob: {
  //     required:"*Required",
  //     validate: (value:string) => calculateAge(value) >= 13 || "You must be at least 13 years old",
  // },
};

function calculateAge(dob: string) {
  const birthday = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}
