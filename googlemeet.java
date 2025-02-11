package basic;

import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.*;
import java.lang.Runtime;
import java.net.URI;
import java.util.ArrayList;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

class Opencmd {
    public void opencommand() throws Exception {
        Robot robot = new Robot();
        try {
            java.awt.Desktop.getDesktop().open(new File("C:\\WINDOWS\\system32\\cmd.exe"));
        } catch (IOException e) {
            System.out.println("can't find" + e);
        }
        Thread.sleep(3000);
        int keyInput[] = { KeyEvent.VK_C, KeyEvent.VK_H, KeyEvent.VK_R,
                KeyEvent.VK_O, KeyEvent.VK_M, KeyEvent.VK_E, KeyEvent.VK_PERIOD,
                KeyEvent.VK_E, KeyEvent.VK_X, KeyEvent.VK_E, KeyEvent.VK_SPACE,
                KeyEvent.VK_MINUS, KeyEvent.VK_R, KeyEvent.VK_E, KeyEvent.VK_M,
                KeyEvent.VK_O, KeyEvent.VK_T, KeyEvent.VK_E, KeyEvent.VK_MINUS,
                KeyEvent.VK_D, KeyEvent.VK_E, KeyEvent.VK_B, KeyEvent.VK_U,
                KeyEvent.VK_G, KeyEvent.VK_G,
                KeyEvent.VK_I,
                KeyEvent.VK_N,
                KeyEvent.VK_G, KeyEvent.VK_MINUS, KeyEvent.VK_P, KeyEvent.VK_O,
                KeyEvent.VK_R, KeyEvent.VK_T, KeyEvent.VK_EQUALS, KeyEvent.VK_9,
                KeyEvent.VK_2, KeyEvent.VK_2, KeyEvent.VK_2, KeyEvent.VK_SPACE,
                KeyEvent.VK_MINUS,
                KeyEvent.VK_MINUS,
                KeyEvent.VK_U,
                KeyEvent.VK_S, KeyEvent.VK_E, KeyEvent.VK_R, KeyEvent.VK_MINUS,
                KeyEvent.VK_D,
                KeyEvent.VK_A, KeyEvent.VK_T,
                KeyEvent.VK_A,
                KeyEvent.VK_MINUS, KeyEvent.VK_D, KeyEvent.VK_I, KeyEvent.VK_R,
                KeyEvent.VK_SPACE,
                KeyEvent.VK_SHIFT,
                KeyEvent.VK_7,
                KeyEvent.VK_7, KeyEvent.VK_SPACE, KeyEvent.VK_E, KeyEvent.VK_X,
                KeyEvent.VK_I, KeyEvent.VK_T };
        Thread.sleep(100);
        for (int i = 0; i < keyInput.length; i++) {
            robot.keyPress(keyInput[i]);
            robot.delay(05);
        }
        robot.keyRelease(KeyEvent.VK_SHIFT);
        Thread.sleep(1000);
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);
        Thread.sleep(3000);
    }
}

public class googlemeet {
    WebDriver driver;

    public void setupBrowser(String url) throws Exception {
        String currDir = System.getProperty("user.dir");
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("debuggerAddress", "localhost:9222");
        System.setProperty("webdriver.chrome.driver", currDir + "\\drivers\\chromedriver.exe");
        driver = new ChromeDriver(options);
        if (url != "") {
            openNewTab(driver, url, 0);
        } else {
            System.out.println("quitting automation , no url found");
            driver.quit();
        }
        Thread.sleep(5000);
    }

    public void openNewTab(WebDriver driver, String url, int position) {
        ((JavascriptExecutor) driver).executeScript("window.open()");
        ArrayList<String> tabs = new ArrayList<>(driver.getWindowHandles());
        System.out.println("tabs : " + tabs.size() + " >position: " + position + " >\t" +
                url);
        driver.switchTo().window(tabs.get(position));
        driver.get(url);
    }

    public void meetingId() throws Exception {
        Thread.sleep(3000);
        driver.findElement(
                By.xpath("//*[@id=\"yDmH0d\"]/c-wiz/div/div[2]/div/div[1]/div[3]/div/div[1]/div[1]/div/button/span"))
                .click();
        driver.findElement(By
                .xpath("//*[@id=\"yDmH0d\"]/c-wiz/div/div[2]/div/div[1]/div[3]/div/div[1]/div[2]/div/ul/li[2]/span[3]"))
                .click();
        Thread.sleep(12000);
        driver.findElement(By.xpath("//*[@id=\"ow2\"]/div[3]/div[2]/div[3]/div[2]/span/button")).click();
        driver.findElement(By.xpath(
                "//*[@id=\"ow2\"]/div[1]/div/div[20]/div[3]/div[11]/div/div/div[2]/div/div[1]/div/div[2]/span/button"))
                .click();
        driver.findElement(By
                .xpath("//*[@id=\"ow2\"]/div[1]/div/div[20]/div[3]/div[11]/div/div/div[2]/div/div[2]/div/span/button"))
                .click();
        Thread.sleep(3000);
        openNewTab(driver, "https://web.whatsapp.com", 1);
    }

    public void shareID() throws Exception {
        Thread.sleep(10000);
        Robot r = new Robot();
        for (int i = 0; i < 7; i++) {
        }
        r.keyPress(KeyEvent.VK_TAB);
        r.keyRelease(KeyEvent.VK_TAB);
        r.delay(100);
        r.keyPress(KeyEvent.VK_S);
        r.keyPress(KeyEvent.VK_A);
        r.keyPress(KeyEvent.VK_H);
        r.keyPress(KeyEvent.VK_I);
        r.keyPress(KeyEvent.VK_L);
        r.keyPress(KeyEvent.VK_SPACE);
        r.keyPress(KeyEvent.VK_K);
        r.keyPress(KeyEvent.VK_A);
        r.keyPress(KeyEvent.VK_K);
        r.keyPress(KeyEvent.VK_A);
        r.keyPress(KeyEvent.VK_S);
        r.keyPress(KeyEvent.VK_ENTER);
        r.keyRelease(KeyEvent.VK_ENTER);
        Thread.sleep(2000);
        r.keyPress(KeyEvent.VK_ENTER);
        r.keyRelease(KeyEvent.VK_ENTER);
        Thread.sleep(4000);
        r.keyPress(KeyEvent.VK_CONTROL);
        r.keyPress(KeyEvent.VK_V);
        r.keyRelease(KeyEvent.VK_CONTROL);
        r.keyPress(KeyEvent.VK_ENTER);
        r.keyRelease(KeyEvent.VK_ENTER);
        Thread.sleep(3000);
        driver.close();
        r.keyPress(KeyEvent.VK_CONTROL);
        r.keyPress(KeyEvent.VK_W);
        r.keyRelease(KeyEvent.VK_CONTROL);
    }

    public static void main(String[] args) throws Exception {
        googlemeet g = new googlemeet();
        Opencmd oc = new Opencmd();
        oc.opencommand();
        g.setupBrowser("https://meet.google.com");
        g.meetingId();
        g.shareID();
    }
}