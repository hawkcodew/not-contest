export const UpdateTelegramPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center text-black">
        Oops! Time for an update. <br />
        <p>
          Looks like you're using an older version of Telegram that doesn't
          support some of the features we rely on.
        </p>
        <p>Please update the Telegram app to continue using the bot.</p>
      </div>
    </div>
  );
};
