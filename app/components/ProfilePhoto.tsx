import Image from "next/image";

export default function ProfilePhoto() {
  return (
    <Image
      className="profile-photo"
      src="/pic.jpg"
      alt="Erin Recachinas"
      width={250}
      height={250}
      style={{ width: 250, height: 250, objectFit: "cover" }}
      priority
    />
  );
}
