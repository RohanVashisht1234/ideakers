// app/dashboard/leaderboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  Spinner,
  DarkThemeToggle,
  Flowbite,
  Badge,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Avatar,
  Table,
} from "flowbite-react";
import {
  HiChip,
  HiUser,
  HiClock,
  HiAcademicCap,
  HiLogout,
  HiStar,
  HiLightningBolt,
  HiArrowUp,
  HiArrowDown,
} from "react-icons/hi";
import { signOut } from "next-auth/react";

interface UserScore {
  _id: string;
  name: string;
  email: string;
  points: number;
  image: string;
  createdAt: string;
}

// Dummy data for demonstration
const createDummyUsers = (sessionUser: any): UserScore[] => [
  {
    _id: "1",
    name: "Emma Davis",
    email: "emma@example.com",
    points: 2500,
    image: "",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    _id: "2",
    name: sessionUser?.name || sessionUser?.email || "Unknown User",
    email: sessionUser?.email || "unknown@example.com",
    points: 2000, // Always second place
    image: sessionUser?.image || "",
    createdAt: "2025-01-02T00:00:00Z",
  },
  {
    _id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    points: 1750,
    image: "",
    createdAt: "2025-01-03T00:00:00Z",
  },
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    points: 1500,
    image: "",
    createdAt: "2025-01-04T00:00:00Z",
  },
  {
    _id: "5",
    name: "James Anderson",
    email: "james@example.com",
    points: 1250,
    image: "",
    createdAt: "2025-01-05T00:00:00Z",
  },
];

export default function LeaderboardPage() {
  const currentDate = new Date("2025-01-11T00:24:10Z");
  const { status, data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserScore[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(2); // Always 2nd place
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }, [status, router]);

  // Fetch users data with dummy data
  useEffect(() => {
    const fetchUsers = async () => {
      if (status !== "authenticated" || !session?.user) return;

      try {
        // Create dummy data with session user in second place
        const dummyData = createDummyUsers(session.user);

        const sortedUsers = [...dummyData].sort((a, b) =>
          sortOrder === "desc" ? b.points - a.points : a.points - b.points,
        );

        setUsers(sortedUsers);
        setCurrentUserRank(2); // Always 2nd place
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [status, session, sortOrder]);

  return (
    <Flowbite>
      <Navbar
        fluid
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <NavbarBrand href="/dashboard">
          <HiChip className="text-2xl text-purple-600 dark:text-purple-400 mr-2" />
          <span className="self-center text-xl font-semibold text-purple-600 dark:text-purple-400">
            Leaderboard
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/dashboard" className="dark:text-white">
            Dashboard
          </NavbarLink>
          <NavbarLink
            href="/dashboard/generate-project"
            className="dark:text-white"
          >
            Generate Project
          </NavbarLink>
          <NavbarLink
            href="/dashboard/leaderboard"
            active={true}
            className="dark:text-white"
          >
            Leaderboard
          </NavbarLink>
        </NavbarCollapse>
        <div className="flex items-center gap-4">
          <Badge
            color="purple"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            <HiUser className="text-purple-600 dark:text-purple-400" />
            {session?.user?.name || "RohanVashisht1234"}
          </Badge>
          <Badge
            color="indigo"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            <HiAcademicCap className="text-purple-600 dark:text-purple-400" />
            Rank #2 🥈
          </Badge>
          <Badge
            color="purple"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            <HiClock className="text-purple-600 dark:text-purple-400" />
            {new Date("2025-01-11T00:28:08Z").toLocaleTimeString()}
          </Badge>
          <DarkThemeToggle />
          <Button
            gradientDuoTone="purpleToPink"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <HiLogout className="mr-2" />
            Sign Out
          </Button>
        </div>
      </Navbar>

      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text mb-4">
              Global Leaderboard
            </h1>
            {currentUserRank && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your current rank:{" "}
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  #{currentUserRank}
                </span>
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-x-auto shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-end mb-4">
                <Button
                  gradientDuoTone="purpleToPink"
                  size="sm"
                  onClick={() =>
                    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                  }
                >
                  {sortOrder === "desc" ? (
                    <HiArrowDown className="mr-2" />
                  ) : (
                    <HiArrowUp className="mr-2" />
                  )}
                  Sort by Points
                </Button>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="text-center">Rank</Table.HeadCell>
                  <Table.HeadCell>User</Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Points
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Member Since
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        user.email === session?.user?.email
                          ? "bg-purple-50 dark:bg-purple-900/20 font-semibold"
                          : ""
                      }`}
                    >
                      <Table.Cell className="text-center font-medium">
                        {index + 1 <= 3 ? (
                          <span className="text-xl">
                            {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
                          </span>
                        ) : (
                          `#${index + 1}`
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            img={
                              user.image ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name,
                              )}`
                            }
                            rounded
                            size="sm"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        <Badge
                          color="purple"
                          size="sm"
                          className="font-semibold"
                        >
                          <HiStar className="inline-block mr-1" />
                          {user.points.toLocaleString()}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="text-center text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                    </motion.tr>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>Leaderboard last updated: {currentDate.toLocaleString()}</p>
            <p className="mt-2">
              Total Users: {users.length} • Total Points:{" "}
              {users
                .reduce((acc, user) => acc + user.points, 0)
                .toLocaleString()}
            </p>
          </motion.div>
        </div>
      </div>
    </Flowbite>
  );
}
