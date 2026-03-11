import { createContext } from "react";

import { Config, Constants } from "@/classes/Constants";
import type { Device } from "@/classes/Device";
import FH from "@/classes/FH";
import type { MyUser } from "@/classes/MyUser";
import type { AdminSettings } from "@/classes/templates/AdminSettings";
import QuasarPage from "@/components/templates/QuasarPage";
import { useFHWatch } from "@/hooks/useFHWatch";
import { useLoading as useInitialLoading } from "@/hooks/useLoading";
import { useC } from "@/hooks/useReactHooks";

import PageWrapper from "../helpers/PageWrapper";
import RegisterPage from "../helpers/RegisterPage";
import SignInPage from "../helpers/SignInPage";
import EmailVerificationPage from "./EmailVerificationPage";
import { UserContext } from "./User_Wrapper";
import { useBluetooth } from "@/app/z/Bluetooth/useBluetooth";

// ? ----------------------
// ? FIRESTORE DATA OBJECTS
// ? ----------------------

export const FHContext = createContext({
  adminSettings: {} as AdminSettings | null,
  myUser: {} as MyUser | null,
  device: {} as Device | null,
  Bluetooth: {} as ReturnType<typeof useBluetooth>,
});

interface FHWrapperProps {}

const FHWrapper: React.FC<FHWrapperProps> = () => {
  const { user, loadingUser } = useC(UserContext);

  //! QUASAR
  const [adminSettings, loadingAdminSettings] = useFHWatch(
    FH.AdminSettings,
    "settings"
  );

  //! MY USER
  const [myUser, loadingMyUser] = useFHWatch(FH.MyUser, user?.uid);

  //! DEVICE
  const [device, loadingDevice] = useFHWatch(FH.Device, "readings");

  //! BLUETOOTH
  const Bluetooth = useBluetooth(
    Constants.BluetoothServiceId,
    Constants.BluetoothCharacteristicId
  );

  //! LOADING
  // const loading = useInitialLoading(
  //   loadingAdminSettings,
  //   loadingUser,
  //   loadingMyUser,
  //   loadingDevice
  // );

  //! PAGES
  // if (loading) return <div className="ws hs" />;
  if (adminSettings === null && !Constants.Offline) return <QuasarPage />;
  if (adminSettings?.quasar && !Constants.Offline) return <QuasarPage />;
  if (Config.hasSignIn) {
    if (user === null) return <SignInPage />;

    if (Config.hasEmailVerification && !user.emailVerified) {
      return <EmailVerificationPage user={user} />;
    }

    if (Config.hasRegister && !Constants.Offline) {
      if (myUser === null) return <RegisterPage user={user} />;
    }
  }

  return (
    <FHContext value={{ adminSettings, myUser, device, Bluetooth }}>
      <PageWrapper />
    </FHContext>
  );
};

export default FHWrapper;
