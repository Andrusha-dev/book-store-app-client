import {UserProfile} from "@/features/account";

//Потрібен для серверних сторінок чи шаблонів, якщо вони є захищеними і серверу не потрібно їх перевіряти
export const instant = false;

export default function AccountPage() {
    return <UserProfile/>
}