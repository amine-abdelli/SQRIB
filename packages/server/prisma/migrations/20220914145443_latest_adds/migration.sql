-- RenameIndex
ALTER INDEX "Settings_userId_key" RENAME TO "Settings.userId_unique";

-- RenameIndex
ALTER INDEX "User_email_key" RENAME TO "User.email_unique";

-- RenameIndex
ALTER INDEX "User_nickname_key" RENAME TO "User.nickname_unique";
