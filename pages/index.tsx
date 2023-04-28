import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

import { useState, useEffect } from "react";
import { IUserInput } from "../types/interfaces";

export default function Home() {
    // initial states for user input and form validation
    const [userInput, setUserInput] = useState<IUserInput>({});
    const [invalidInput, setInvalidInput] = useState(false);

    // update user input state on change of imput values
    function handleChange(e) {
        setUserInput({
            ...userInput,
            [e.target.name]: parseInt(e.target.value),
        });
    }

    useEffect(() => {
        // validate user input
        if (
            userInput.posX < 0 ||
            userInput.posX > 100 ||
            userInput.posY < 0 ||
            userInput.posY > 100 ||
            isNaN(userInput.posX) ||
            isNaN(userInput.posY)
        ) {
            console.log("invalid input");

            setInvalidInput(true);
            return;
        } else {
            setInvalidInput(false);
        }
    }, [userInput]);

    function handleSubmit() {
        console.log("submit");
        fetch("/api/station", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        });
    }

    return (
        <>
            <Head>
                <title>Station Finder</title>
                <meta
                    name="description"
                    content="Find your fastest relay station"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="request_modal">
                    <p>
                        Please Input your position, we will calculate the best
                        station for you.
                    </p>
                    <div>
                        <input
                            name="posX"
                            type="text"
                            placeholder="position: x | 0 <= x <= 100"
                            onChange={handleChange}
                        />
                        <input
                            name="posY"
                            type="text"
                            placeholder="position: y | 0 <= x <= 100"
                            onChange={handleChange}
                        />
                    </div>
                    {invalidInput ? (
                        <p className="error">
                            Please input a number between 0 and 100
                        </p>
                    ) : (
                        <button onClick={handleSubmit}>Submit</button>
                    )}
                    {/* {inputsCompleted && (
                        <button onClick={handleSubmit}>Submit</button>
                    )} */}
                </div>
            </main>
        </>
    );
}
